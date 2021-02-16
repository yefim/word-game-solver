const $form = document.querySelector('form');
const $answers = document.querySelector('pre');
const words = JSON.parse(document.querySelector('#words').innerHTML);

// Checks if word can be spelled with the specified letter hash
const canSpell = (word, letterHash) => {
  const clone = {...letterHash};
  for (const letter of word) {
    if (clone[letter] && clone[letter] > 0) {
      clone[letter]--;
      continue;
    }
    return false;
  }
  return true;
};

const or = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '*' || b[i] === '*' || a[i] === b[i]) {
      continue;
    }
    return false;
  }
  return true;
};

const generateHash = (letters) => {
  const h = {};
  for (const letter of letters) {
    h[letter] = h[letter] || 0;
    h[letter]++;
  }
  return h;
};

const solve = (input, letters) => {
  const letterHash = generateHash(letters);

  return words.filter((word) => {
    return word.length === input.length && or(word, input) && canSpell(word, letterHash);
  });
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const pattern = e.target.pattern.value.toLowerCase();
  const letters = e.target.letters.value.toLowerCase();

  $answers.innerHTML = solve(pattern, letters);
});
