import { Table, Tr, Th, Td, Badge } from '@commercelayer/app-elements'
import { useImportDetailsContext } from './Provider'

export function ImportErrors(): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  if (data?.errors_log === null || data?.errors_log === undefined) {
    return null
  }

  return (
    <>
      <header className='border-b pb-4 flex justify-between items-center border-gray-100'>
        <h2 className='text-lg font-semibold'>Errores</h2>
      </header>
      <Table
        thead={
          <Tr>
            <Th>Código</Th>
            <Th>Error</Th>
          </Tr>
        }
        tbody={
          <>
            {Object.entries(data.errors_log).map((entity: any) => {
              return (
                <Tr key={entity[0]}>
                  <Td>{entity[0]}</Td>
                  <Td>
                    <ul>
                      {Object.entries(entity[1]).map((field: any) => {
                        return (
                          <li key={field[0]}>
                            El campo{" "}
                            <Badge variant="secondary">{field[0]}</Badge>{" "}
                            {field[1].length > 1 ? "generó los siguientes errores" : "generó el siguiente error"}{": "}
                            <Badge variant="secondary">{field[1].join(",")}</Badge>
                          </li>
                        )
                      }
                      )}
                    </ul>
                  </Td>
                </Tr>
              )})}
          </>
        }
      />
    </>
  )
}
