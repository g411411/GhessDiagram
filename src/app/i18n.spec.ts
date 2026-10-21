import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, vi } from 'vitest';
import { App } from './app';
import { LANGUAGE_STORAGE_KEY } from './i18n';

beforeEach(() => localStorage.clear());
afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  document.documentElement.lang = 'en';
});
async function setup() {
  await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  return fixture;
}

describe('Saved interface language', () => {
  it('applies a selected language only after Save, retaining the English Settings tab', async () => {
    const fixture = await setup(),
      app = fixture.componentInstance;
    app.selectTab('settings');
    app.chooseLanguage('ru');
    fixture.detectChanges();
    expect(app.language()).toBe('en');
    expect(app.t('Help')).toBe('Help');
    app.saveLanguage();
    fixture.detectChanges();
    expect(app.language()).toBe('ru');
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('ru');
    expect(document.documentElement.lang).toBe('ru');
    expect(fixture.nativeElement.querySelector('#tab-settings').textContent.trim()).toBe(
      'Settings',
    );
    expect(fixture.nativeElement.querySelector('#tab-help').textContent.trim()).toBe('Помощь');
    expect(fixture.nativeElement.querySelector('#settings-panel button').textContent.trim()).toBe(
      'Save',
    );
    expect(fixture.nativeElement.querySelector('#help-panel h1').textContent).toContain(
      'Справка для тренеров',
    );
    app.error.set('Maximum file size is 100 MB.');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-banner').textContent).toContain('100 МБ');
  });
  it('restores Spanish on a later visit and allows a return to English', async () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'es');
    const fixture = await setup(),
      app = fixture.componentInstance;
    expect(app.language()).toBe('es');
    expect(fixture.nativeElement.querySelector('#tab-pdf').textContent.trim()).toBe(
      'Biblioteca PDF',
    );
    expect(fixture.nativeElement.querySelector('#tab-settings').textContent.trim()).toBe(
      'Settings',
    );
    expect(app.t('Click to enlarge diagram')).toBe('Haz clic para ampliar el diagrama');
    app.chooseLanguage('en');
    app.saveLanguage();
    fixture.detectChanges();
    expect(app.t('Help')).toBe('Help');
    expect(document.documentElement.lang).toBe('en');
  });
  it('falls back to English for an invalid saved preference', async () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'invalid');
    const fixture = await setup();
    expect(fixture.componentInstance.language()).toBe('en');
    fixture.componentInstance.chooseLanguage('invalid');
    expect(fixture.componentInstance.draftLanguage()).toBe('en');
  });
  it('keeps the chosen language usable if browser storage is blocked', async () => {
    const fixture = await setup(),
      app = fixture.componentInstance;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });
    app.chooseLanguage('es');
    app.saveLanguage();
    expect(app.language()).toBe('es');
    expect(app.saveNotice()).toContain('could not save');
  });
  it('does not close or reset an open document when saving language', async () => {
    const fixture = await setup(),
      app = fixture.componentInstance;
    app.fileName.set('lesson.pdf');
    app.pageCount.set(10);
    app.page.set(4);
    app.selectTab('settings');
    app.chooseLanguage('ru');
    app.saveLanguage();
    app.selectTab('local');
    expect(app.fileName()).toBe('lesson.pdf');
    expect(app.page()).toBe(4);
    expect(app.pageCount()).toBe(10);
  });
});
