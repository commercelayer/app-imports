import { useResourceSelectorContext } from "./Provider"

export default function SearchResults() {
  const {
    state: { resources, selectedResource },
    select,
  } = useResourceSelectorContext()

  return resources.length ? (
    <ul>
      {resources.map((r) => (
        <li key={r.id} onClick={() => select(r)}>
          {selectedResource?.id === r.id ? <strong>{r.name}</strong> : <span>{r.name}</span>}
        </li>
      ))}
    </ul>
  ) : (
    <div>No resource found</div>
  )
}
