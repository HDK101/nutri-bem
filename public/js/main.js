const inputs = document.getElementsByClassName('format-cpf');

const indexes = [...Array(inputs.length).keys()];

function formatCpf(text) {
  const textNumbers = text.replace(/\D/g, '');

  const firstGroup = textNumbers.slice(0, 3);

  const secondGroup = textNumbers.slice(3, 6);

  const thirdGroup = textNumbers.slice(6, 9);

  const fourthGroup = textNumbers.slice(9, 11);

  if (textNumbers.length <= 3) return firstGroup;
  if (textNumbers.length > 3 && textNumbers.length <= 6) return `${firstGroup}.${secondGroup}`;
  if (textNumbers.length > 6 && textNumbers.length <= 9) return `${firstGroup}.${secondGroup}.${thirdGroup}`;
  if (textNumbers.length > 9) return `${firstGroup}.${secondGroup}.${thirdGroup}-${fourthGroup}`;
  return '';
}

indexes.forEach((index) => {
  const element = inputs.item(index);
  element.addEventListener('keyup', () => {
    const formattedCpf = formatCpf(element.value);
    element.value = formattedCpf;
  });
});
