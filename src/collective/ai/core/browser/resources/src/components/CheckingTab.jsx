import CheckmarkIcon from "./checkmark.svg?react";
import ErrorIcon from "./cross.svg?react";

const checklist = [
  {
    id: 1,
    name: "La formulation des phrases est-elle correcte et compréhensible ?",
    hasError: true,
    content:
      "Vérifiez que les phrases sont claires, concises et sans fautes de français.",
  },
  {
    id: 2,
    name: "Tous les champs obligatoires sont-ils renseignés ?",
    hasError: false,
    content:
      "Assurez-vous que l'utilisateur ne peut pas valider le formulaire sans remplir les informations essentielles.",
  },
  {
    id: 3,
    name: "Les instructions fournies sont-elles suffisamment claires ?",
    hasError: false,
    content:
      "Les utilisateurs doivent comprendre facilement les consignes et savoir quelles informations fournir.",
  },
  {
    id: 4,
    name: "Les formats de données (e-mails, dates...) sont-ils valides ?",
    hasError: true,
    content:
      "Vérifiez qu'un champ e-mail accepte un format correct, qu'une date soit au bon format, etc.",
  },
];


export default function CheckingTab() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {checklist.map((comment) => (
        <li key={comment.id} className="flex gap-x-4 py-5">
          {/* Icône remplacée : check si hasError = false, sinon croix */}
          {comment.hasError ? (
            <ErrorIcon className="h-12 w-12 flex-none rounded-full  text-red-500" />
          ) : (
            <CheckmarkIcon className="h-12 w-12 flex-none rounded-full  text-green-500" />
          )}

          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm/6 font-semibold text-gray-900">
                {comment.name}
              </p>
            </div>
            <p className="mt-1 line-clamp-2 text-sm/6 text-gray-600">
              {comment.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
