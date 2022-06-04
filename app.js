require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');

const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const api = require('./api');

app.get('/track/:trackId', async (req, res, next) => {
  const options = {
    root: path.join(__dirname)
  };
  const fileName = 'track.gif';
  try {
    let { trackId } = req.params;
    if (!trackId){
      throw new Error('Invalid params');
    }
    trackId = trackId.split('.')[0];
    const header = req.headers;
    await api.post('', {
      query: `
        query MyQuery ($track_id: String!, $header: String) {
          read_mail(data: {
            track_id: $track_id,
            header: $header,
          }){
            success
            message
            code
          }
        }
      `,
      variables: {
        track_id: trackId,
        header: JSON.stringify(header),
      },
    });
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } catch (error) {
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  }
});
// app.listen(3050, () => console.log(`Listening on: 3050`));

module.exports.handler = serverless(app);