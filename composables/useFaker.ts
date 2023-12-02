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

  return {
    getUsers,
  }
}
