import { Router } from 'express';
import { writeFileSync } from 'fs';
import { loadSpeakers } from '../modules/loadSpeakers';
import { valToken } from '../modules/validateToken';
import { valName } from '../modules/validateName';
import { valAge } from '../modules/validateAge';
import { valTalker } from '../modules/validateTalker';
import { valWatchedRated } from '../modules/validateWatched';

const router = Router();

// load speakears
router.use(loadSpeakers);

// task 1
// status(200) = Request Success
router.get('/', (req, res) => {
  if (req.speakers.length === 0) {
    return res.status(200).json([]);
  }

  res.status(200).json(req.speakers);
});

// task 7
router.get('/search', valToken, (req, res) => {
  const spkfilter = req.speakers.filter((e) => e.name.includes(req.query.q));

  if (req.query.q === undefined) {
    return res.status(200).json(req.speakers);
  }

  res.status(200).json(spkfilter);
});

// task 2
// status(404) = Not Found
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const spkfilter = req.speakers.filter((e) => e.id === parseInt(id, 10)); // decimal radix

  if (!id || spkfilter.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(spkfilter[0]);
});

// task 4
// status(201) = New Resource Created & Request Successful
router.post('/', valToken, valName, valAge, valTalker, valWatchedRated,
  (req, res) => {
    const { name, age, talk } = req.body;
    const { speakers } = req;
    const id = speakers.length + 1;

    speakers.push({ name, age, id, talk });

    writeFileSync('./talker.json', JSON.stringify(speakers));

    return res.status(201).json({ name, age, id, talk });
});

// task 5
router.put('/:id', valToken, valName, valAge, valTalker, valWatchedRated,
  (req, res) => {
   let { id } = req.params;
   const { name, age, talk } = req.body;
   const { speakers } = req;
   const spkIndex = speakers.findIndex((e) => e.id === parseInt(id, 10));

   id = parseInt(id, 10);

   speakers[spkIndex] = { ...speakers[spkIndex], name, age, talk, id };

   writeFileSync('./talker.json', JSON.stringify(speakers));

   return res.status(200).json({ name, age, id, talk });
});

// task 6
router.delete('/:id', valToken, (req, res) => {
  const { id } = req.params;
  const { speakers } = req;
  const spkIndex = speakers.findIndex((e) => e.id === parseInt(id, 10));

  speakers.splice(spkIndex, 1);

  writeFileSync('./talker.json', JSON.stringify(speakers));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

export default router;
