export class AffectationLigne {
  codeagiv = "";
  id = "";
  idposte = 0;
  idvigile = 0;
  jourRepos: string | number = 0;
  libellePoste = "";
  matricule = "";
  nomsVigile = "";
  dateAffectation = new Date();
  postesCodesAgiv: Array<string> | undefined = new Array<string>();
}
