export class TrainRelationshipNotFound extends Error {
  constructor() {
    super('Não foi possível encontrar sua relação com o treino.')
  }
}
