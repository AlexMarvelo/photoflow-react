import jsonp from 'jsonp';

export default function(url) {
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
