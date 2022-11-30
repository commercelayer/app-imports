import { execSync } from 'child_process'
import { writeFile } from 'fs'
import { resolve } from 'path'
import { Plugin } from 'vite'

interface Options {
  fileName: string
}

interface GenerateFileParams {
  distFolder: string
  fileName: string
}

function prepareFileContent(): string {
  const manifest = {
    version: 'N/A',
    hash: 'N/A',
    copyright: `© ${new Date().getFullYear()} Commerce Layer, Inc.`
  }
  try {
    manifest.version = execSync('git describe --tags --abbrev=0')
      .toString()
      .trimEnd()
    manifest.hash = execSync('git rev-parse --short HEAD').toString().trimEnd()
  } catch {
    console.log('Could not retrieve git info')
  }

  return JSON.stringify(manifest, null, 2)
}

function generateFile({ distFolder, fileName }: GenerateFileParams): void {
  const filePath = resolve(__dirname, '..', distFolder, fileName)
  writeFile(filePath, prepareFileContent(), { flag: 'w' }, (err) => {
    if (err != null) {
      throw err
    }
    console.log(`🎉 Release manifest generated in /${distFolder}/${fileName}`)
  })
}

function generateReleaseManifestPlugin(options: Options): Plugin {
  let distFolder: string

  return {
    name: 'vite-plugin-generate-release-manifest',
    configResolved(resolvedConfig) {
      distFolder = resolvedConfig.build.outDir
    },

    closeBundle() {
      generateFile({
        distFolder,
        fileName: options.fileName
      })
    }
  }
}

export default generateReleaseManifestPlugin
