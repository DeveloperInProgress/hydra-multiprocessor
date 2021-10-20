import { GraphQLSource } from './GraphQLSource'
import { IProcessorSource } from './IProcessorSource'
import { getConfig as conf } from '../start/config'
import pImmediate from 'p-immediate'

let eventSources: GraphQLSource[]

export * from './IProcessorSource'

//to-do :
//one of the two:
//1.) return multiple event sources here
//2.) mutiple graphQL clients inside GraphQLSource
//It is best to have a seperate abstraction for each indexer
//Go with option 1.

export async function getProcessorSource(): Promise<IProcessorSource[]> {

  Object.keys(conf().INDEXER_ENDPOINT_URLS).forEach(async (indexer: string)=>{
    await pImmediate()
    eventSources.push(new GraphQLSource(conf().INDEXER_ENDPOINT_URLS[indexer as keyof JSON]))
  })

  return eventSources
}
