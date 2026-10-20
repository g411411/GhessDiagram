import { TestBed } from '@angular/core/testing';
import { App } from './app';
describe('Chess Diagrams', () => {
  it('starts with local upload and a hidden diagram viewer', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.welcome h1').textContent).toContain(
      'Every diagram',
    );
    expect(fixture.nativeElement.querySelector('#diagram-dialog').hidden).toBe(true);
    expect(fixture.componentInstance.pageCount()).toBe(0);
  });
  it('rejects unsupported files without starting document loading', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.componentInstance.open(new File(['test'], 'test.exe'));
    expect(fixture.componentInstance.error()).toContain('Choose a PDF');
    expect(fixture.componentInstance.busy()).toBe(false);
  });
  it('rejects files over the size limit', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const file = new File([], 'large.pdf');
    Object.defineProperty(file, 'size', { value: 101 * 1024 * 1024 });
    await fixture.componentInstance.open(file);
    expect(fixture.componentInstance.error()).toContain('100 MB');
  });
});
