const express = require('express');
const router = express.Router();
const db = require('./../connection');
const ErrorHandler = require('../utilities/ErrorHandler');
const WordCountHelper = require('./../utilities/WordCountHelper');

const errorHandler = new ErrorHandler();
const wordCountHelper = new WordCountHelper();

router.get('/', (req, res) => {
  try {
    db.query('SELECT * FROM results', (err, result) => {
      if (err) {
        return errorHandler.handleQueryError(err, res);
      }

      if (result.rowCount === 0) {
        return res.status(204).json({
          message: 'No insights found',
        });
      }

      res.status(200).send({
        message: 'Insights loaded successfully',
        result: result.rows,
      });
    });
  } catch (err) {
    return errorHandler.handleQueryError(err, res);
  }
});

router.post('/search', async (req, res) => {
  try {
    const resultData = await wordCountHelper.webScraper(req.body.url);
    db.query(
      'INSERT INTO results (domain, word_count, favourite, web_links, media_links) VALUES ($1,$2,$3,$4,$5)',
      [
        resultData.domain,
        resultData.wordCount,
        resultData.favourite,
        resultData.webLinks,
        resultData.mediaLinks,
      ],
      (err, result) => {
        if (err) {
          return errorHandler.handleQueryError(err, res);
        }
        if (result.rowCount === 0) {
          return res.status(400).json({
            message: 'Insertion failed',
          });
        }
        return res.status(201).json({
          message: 'Insight added successfully',
          result: resultData,
        });
      }
    );
  } catch (err) {
    return errorHandler.handleQueryError(err, res);
  }
});

router.patch('/:id', (req, res) => {
  const insightId = req.params.id;
  try {
    db.query(
      'UPDATE results SET favourite = $1 WHERE id = $2',
      [true, insightId],
      (err, result) => {
        if (err) {
          return errorHandler.handleQueryError(err, res);
        }

        if (result.rowCount === 0) {
          return res.status(404).json({
            message: 'Insight not found',
          });
        }

        return res.status(200).json({
          message: 'Added to favourites',
        });
      }
    );
  } catch (err) {
    return errorHandler.handleQueryError(err, res);
  }
});

router.delete('/:id', (req, res) => {
  const insightId = req.params.id;
  try {
    db.query('DELETE FROM results WHERE id = $1', [insightId], (err, result) => {
      if (err) {
        return errorHandler.handleQueryError(err, res);
      }

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: 'Insight not found',
        });
      }

      return res.status(200).json({
        message: 'Insight deleted successfully',
      });
    });
  } catch (err) {
    return errorHandler.handleQueryError(err, res);
  }
});

module.exports = router;
