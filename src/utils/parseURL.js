export default function parseURL() {
  const url = window.location.hash.slice(1).toLowerCase() || '/';
  const arrURL = url.split('/');
  const request = {
    resource: arrURL[1],
    id_category: arrURL[2],
    question: arrURL[3],
    id_question: arrURL[4],
    score_raund: arrURL[5],
  };

  return request;
}
