

function CardType({ title, icon }) {
  return (
    <div className='cardType'>
      <span class="material-symbols-outlined">{ icon }</span> { title }
    </div>
  );
}

export default CardType;
