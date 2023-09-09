import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  // vus: 1000,
  // duration: '60s',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
  },
  stages: [
    { duration: '10s', target: 1000 }, //ramp up to 1000 vus
    { duration: '30s', target: 1000 }, //hold 1000 vus for 60s
    { duration: '10s', target: 0 } //graceful ramp down
  ]
};

export default function () {
  const min = 900000;
  const max = 1000000;
  const product_id = Math.floor(Math.random() * (max - min) + min);

  http.get(`http://127.0.0.1:3000/qa/questions/?product_id=${product_id}`);

  sleep(1);
}