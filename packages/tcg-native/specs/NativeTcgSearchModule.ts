import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  buildIndex(datasetJson: string): number;
  searchByName(indexId: number, query: string, limit: number): string;
  searchByNumber(indexId: number, number: string, limit: number): string;
}

const NativeTcgSearchModule = TurboModuleRegistry.getEnforcing<Spec>('NativeTcgSearchModule');

export default NativeTcgSearchModule;
