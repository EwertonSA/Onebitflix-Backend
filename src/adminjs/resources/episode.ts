

import path from 'path'
import uploadFileFeature from '@adminjs/upload'
import { FeatureType, ResourceOptions } from 'adminjs'


export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'youtubeUrl', 'secondsLong'],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'youtubeUrl', 'secondsLong', 'createdAt', 'updatedAt'],
  properties: {
    youtubeUrl: {
      type: 'string',
      isVisible: { list: true, edit: true, show: true },  // Controla a visibilidade
    }
  }
}
export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '../../../uploads'),
        opts: {}
      }
    },
    properties: {
      key: 'videoUrl',  // Para arquivos locais
      file: 'uploadVideo'
    },
    uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}`
  }),
]
