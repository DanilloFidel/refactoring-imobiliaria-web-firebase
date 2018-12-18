import { MaterialItensModule } from './material-components.module';

describe('MaterialModulesModule', () => {
  let materialModulesModule: MaterialItensModule;

  beforeEach(() => {
    materialModulesModule = new MaterialItensModule();
  });

  it('should create an instance', () => {
    expect(materialModulesModule).toBeTruthy();
  });
});
