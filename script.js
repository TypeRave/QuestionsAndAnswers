import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  vus: 1100,
  duration: '30s',
};

export default function () {
  const max = 3518963;
  const min = 3419000;
  const product_id = Math.floor(Math.random() * (max - min) + min);

  http.get(`http://127.0.0.1:3000/qa/questions/?product_id=${product_id}`);

  sleep(1);
}