const removeParenthesisRegExp = /\(.*?\)/g

export function authorFilter(nameList: string) {
  const arrayOfNames = nameList
    .split(",")
    .map((name) => name.trim().replace(removeParenthesisRegExp, ""))

  return { arrayOfNames, total: arrayOfNames.length }
}
