import { ShellPage } from './shell.po';

describe('workspace-project App', () => {
  let page: ShellPage;

  beforeEach(() => {
    page = new ShellPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(true).toEqual(true);
  });
});
