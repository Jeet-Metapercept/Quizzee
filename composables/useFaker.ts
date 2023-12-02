import { faker } from '@faker-js/faker'

export function useFaker() {
  function getUsers(take: number = 1) {
    const users = []
    const qty = take > 10 ? 10 : take

    for (let index = 0; index < qty; index++) {
      const user = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
      }

      users.push(user)
    }

    return users
  }

  function generateQuizName() {
    const adjectives = ['Challenging', 'Exciting', 'Brainy', 'Innovative', 'Creative', 'Intriguing', 'Dynamic', 'Interactive', 'Thought-Provoking', 'Captivating']
    const quizTypes = ['Quiz', 'Test', 'Exam', 'Challenge', 'Brain-Teaser', 'Trivia', 'Puzzle', 'Assessment', 'Expedition', 'Adventure']

    const adjective = Math.random() < 0.5
      ? useSample(adjectives)
      : useCapitalize(faker.commerce.productAdjective())

    const quizType = useSample(quizTypes)
    const randomNumber = faker.number.int({ min: 1000, max: 9999 })

    return `${adjective} ${quizType} ${randomNumber}`
  }

  return {
    getUsers,
    generateQuizName,
  }
}
