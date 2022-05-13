
const getAllChirps = async () => {
  try {
    const response = await fetch('/api/chirps')
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error)
  }
};

export {
  getAllChirps
}