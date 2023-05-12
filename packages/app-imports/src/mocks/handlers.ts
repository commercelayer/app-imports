import { rest } from 'msw'

export const handlers = [
  rest.get('https://*.commercelayer.io/api/imports', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 'qgOYIMoGVO',
            type: 'imports',
            links: {
              self: 'https://my-org.commercelayer.io/api/imports/qgOYIMoGVO'
            },
            attributes: {
              resource_type: 'sku_lists',
              parent_resource_id: null,
              status: 'in_progress',
              started_at: '2022-10-24T08:08:43.207Z',
              completed_at: null,
              interrupted_at: null,
              inputs: null,
              inputs_size: 1941,
              errors_count: 0,
              warnings_count: 0,
              destroyed_count: 0,
              processed_count: 738,
              errors_log: {},
              warnings_log: {},
              cleanup_records: false,
              attachment_url:
                'https://team-cl-core-api-import-prd.s3.eu-west-1.amazonaws.com/imports_z3cwrknq8pzhqqsztohvev163cwj?response-content-disposition=attachment%3B%20filename%3D%221666598923_import_d09c5ecf26.json.gz%22%3B%20filename%2A%3DUTF-8%27%271666598923_import_d09c5ecf26.json.gz&response-content-type=application%2Fgzip&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3S53Q2L5GVX6MIFV%2F20221024%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221024T080843Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=680ce9a0fc56c8c7458e8b5ac037aa0d10cac7d92770c8ed57f88a4dbbdc4e06',
              created_at: '2022-10-24T08:08:43.185Z',
              updated_at: '2022-10-24T08:08:43.204Z',
              reference: null,
              reference_origin: null,
              metadata: {}
            },
            relationships: {
              events: {
                links: {
                  self: 'https://my-org.commercelayer.io/api/imports/qgOYIMoGVO/relationships/events',
                  related:
                    'https://my-org.commercelayer.io/api/imports/qgOYIMoGVO/events'
                }
              }
            },
            meta: {
              mode: 'test',
              organization_id: 'dXkmZFMqGR'
            }
          },
          {
            id: 'AkzYIpXJRG',
            type: 'imports',
            links: {
              self: 'https://my-org.commercelayer.io/api/imports/AkzYIpXJRG'
            },
            attributes: {
              resource_type: 'sku_lists',
              parent_resource_id: null,
              status: 'in_progress',
              started_at: '2022-10-24T09:29:02.180Z',
              completed_at: null,
              interrupted_at: null,
              inputs: null,
              inputs_size: 1941,
              errors_count: 0,
              warnings_count: 0,
              destroyed_count: 0,
              processed_count: 1941,
              errors_log: {},
              warnings_log: {},
              cleanup_records: false,
              attachment_url:
                'https://team-cl-core-api-import-prd.s3.eu-west-1.amazonaws.com/imports_9aplsa7w6pmp0wzbsw0ri7iovl9d?response-content-disposition=attachment%3B%20filename%3D%221666603742_import_882bca7ab4.json.gz%22%3B%20filename%2A%3DUTF-8%27%271666603742_import_882bca7ab4.json.gz&response-content-type=application%2Fgzip&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3S53Q2L5GVX6MIFV%2F20221024%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221024T092930Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=abaaaaf5f7440589b721f24f634189a2f02a1233134361457517bc1b499f89ca',
              created_at: '2022-10-24T09:29:02.171Z',
              updated_at: '2022-10-24T09:29:02.177Z',
              reference: null,
              reference_origin: null,
              metadata: {}
            },
            relationships: {
              events: {
                links: {
                  self: 'https://my-org.commercelayer.io/api/imports/AkzYIpXJRG/relationships/events',
                  related:
                    'https://my-org.commercelayer.io/api/imports/AkzYIpXJRG/events'
                }
              }
            },
            meta: {
              mode: 'test',
              organization_id: 'dXkmZFMqGR'
            }
          },
          {
            id: 'moJxInQxza',
            type: 'imports',
            links: {
              self: 'https://my-org.commercelayer.io/api/imports/moJxInQxza'
            },
            attributes: {
              resource_type: 'sku_lists',
              parent_resource_id: null,
              status: 'completed',
              started_at: '2022-10-19T09:20:04.936Z',
              completed_at: '2022-10-19T09:20:56.986Z',
              interrupted_at: null,
              inputs: null,
              inputs_size: 1941,
              errors_count: 0,
              warnings_count: 0,
              destroyed_count: 0,
              processed_count: 1941,
              errors_log: {},
              warnings_log: {},
              cleanup_records: false,
              attachment_url:
                'https://team-cl-core-api-import-prd.s3.eu-west-1.amazonaws.com/imports_ta07v68zn9fagk1ux0wpi3p3frit?response-content-disposition=attachment%3B%20filename%3D%221666171204_import_6eb15dae40.json.gz%22%3B%20filename%2A%3DUTF-8%27%271666171204_import_6eb15dae40.json.gz&response-content-type=application%2Fgzip&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3S53Q2L5GVX6MIFV%2F20221024%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221024T080843Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d10104a0528e2a459523a562f5bd73942866bfe28e9e9346a3a56ac017152c2d',
              created_at: '2022-10-19T09:20:04.930Z',
              updated_at: '2022-10-19T09:20:04.934Z',
              reference: null,
              reference_origin: null,
              metadata: {}
            },
            relationships: {
              events: {
                links: {
                  self: 'https://my-org.commercelayer.io/api/imports/moJxInQxza/relationships/events',
                  related:
                    'https://my-org.commercelayer.io/api/imports/moJxInQxza/events'
                }
              }
            },
            meta: {
              mode: 'test',
              organization_id: 'dXkmZFMqGR'
            }
          }
        ],
        meta: {
          record_count: 3,
          page_count: 1
        },
        links: {
          first:
            'https://my-org.commercelayer.io/api/imports?page%5Bnumber%5D=1&page%5Bsize%5D=25&sort=-created_at',
          last: 'https://my-org.commercelayer.io/api/imports?page%5Bnumber%5D=1&page%5Bsize%5D=25&sort=-created_at'
        }
      })
    )
  }),

  rest.get(
    'https://*.commercelayer.io/api/imports/*',
    async (req, res, ctx) => {
      return await res(
        ctx.status(200),
        ctx.json({
          data: {
            id: 'qYzgIkGdaJ',
            type: 'imports',
            links: {
              self: 'https://giuseppe-imports.commercelayer.io/api/imports/qYzgIkGdaJ'
            },
            attributes: {
              resource_type: 'sku_lists',
              parent_resource_id: null,
              status: 'in_progress',
              started_at: '2022-10-28T09:12:19.546Z',
              completed_at: null,
              interrupted_at: null,
              inputs: null,
              inputs_size: 1941,
              errors_count: 0,
              warnings_count: 0,
              destroyed_count: 0,
              processed_count: 800,
              errors_log: {},
              warnings_log: {},
              cleanup_records: true,
              attachment_url:
                'https://team-cl-core-api-import-prd.s3.eu-west-1.amazonaws.com/imports_60kpsykntafq3i3blrsc1md8c9h7?response-content-disposition=attachment%3B%20filename%3D%221666948339_import_b49f3a5c77.json.gz%22%3B%20filename%2A%3DUTF-8%27%271666948339_import_b49f3a5c77.json.gz&response-content-type=application%2Fgzip&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3S53Q2L5GVX6MIFV%2F20221028%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221028T091301Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=18e60f7c4312f1e961f65f27caa40b7ef739d829f2d54ddb7cb03602bfdc4547',
              created_at: '2022-10-28T09:12:19.538Z',
              updated_at: '2022-10-28T09:12:19.544Z',
              reference: null,
              reference_origin: null,
              metadata: {}
            },
            relationships: {
              events: {
                links: {
                  self: 'https://giuseppe-imports.commercelayer.io/api/imports/qYzgIkGdaJ/relationships/events',
                  related:
                    'https://giuseppe-imports.commercelayer.io/api/imports/qYzgIkGdaJ/events'
                }
              }
            },
            meta: { mode: 'test', organization_id: 'dXkmZFMqGR' }
          }
        })
      )
    }
  )
]
