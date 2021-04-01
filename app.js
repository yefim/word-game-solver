const $form = document.querySelector('form');
const $answers = document.querySelector('.answers');
const $removed = document.querySelector('.removed');
const words = JSON.parse(document.querySelector('#words').innerHTML);
const removedWords = new Set(JSON.parse(localStorage.getItem('removed-words') || '[]'));

for (const word of removedWords) {
  addRemovedWord(word);
}

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
    return !removedWords.has(word) && word.length === input.length && or(word, input) && canSpell(word, letterHash);
  });
};

function addRemovedWord(word) {
  const $li = document.createElement('li');
  $li.innerText = word;
  $removed.appendChild($li);
}

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const pattern = e.target.pattern.value.toLowerCase();
  const letters = e.target.letters.value.toLowerCase();

  const words = solve(pattern, letters);

  const $ul = document.createElement('ul');

  for (const word of words) {
    const $li = document.createElement('li');
    const $word = document.createTextNode(word);
    const $button = document.createElement('button');
    $button.textContent = String.fromCodePoint(0x274C);
    const onClick = () => {
      if (confirm(`Are you sure you want to remove "${word}" from the dictionary?`)) {
        $button.removeEventListener('click', onClick);
        $ul.removeChild($li);
        removedWords.add(word);
        addRemovedWord(word);
        localStorage.setItem('removed-words', JSON.stringify([...removedWords]));
      }
    }
    $button.addEventListener('click', onClick);

    $li.appendChild($word);
    $li.appendChild($button);
    $ul.appendChild($li);
  }

  while ($answers.lastChild) {
    $answers.removeChild($answers.lastChild);
  }
  $answers.appendChild($ul);
});
