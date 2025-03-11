
const weaknessesEnum = {
    "Fire": ["Water", "Ground", "Rock"],
    "Water": ["Electric", "Grass"],
    "Electric": ["Ground"],
    "Grass": ["Fire", "Ice", "Poison", "Flying", "Bug"],
    "Ice": ["Fire", "Fighting", "Rock", "Steel"],
    "Fighting": ["Flying", "Psychic", "Fairy"],
    "Poison": ["Ground", "Psychic"],
    "Ground": ["Water", "Grass", "Ice"],
    "Flying": ["Electric", "Ice", "Rock"],
    "Psychic": ["Bug", "Ghost", "Dark"],
    "Bug": ["Fire", "Flying", "Rock"],
    "Ghost": ["Psychic", "Ghost"],
    "Dark": ["Fighting", "Bug", "Fairy"],
    "Steel": ["Fire", "Fighting", "Ground"],
    "Fairy": ["Poison", "Steel"],
}

export default weaknessesEnum;