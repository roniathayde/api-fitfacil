export class TrainPermissionDenied extends Error {
  constructor() {
    super(
      'Não foi permitido efetuar a operação, somente treinadores podem editar esse treino ',
    )
  }
}
