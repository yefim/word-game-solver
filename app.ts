// const $form = document.querySelector('form');
// const $answers = document.querySelector('pre');
// const words = JSON.parse(document.querySelector('#words').innerHTML);

const words = ['tests'];

function canSpell(word: string, letterHash: {[key: string]: number}): boolean {
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

function or(a: string, b: string): boolean {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '*' || b[i] === '*' || a[i] === b[i]) {
      continue;
    }
    return false;
  }
  return true;
};

function generateHash(letters: string): {[key: string]: number} {
  const h = {};
  for (const letter of letters) {
    h[letter] = h[letter] || 0;
    h[letter]++;
  }
  return h;
};

function solve(input: string, letters: string): string[] {
  const letterHash = generateHash(letters);

  return words.filter((word: string) => {
    return word.length === input.length && or(word, input) && canSpell(word, letterHash);
  });
}

console.log(solve('test*', 'tests'));

export {};
