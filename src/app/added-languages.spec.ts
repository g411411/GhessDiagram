import { TestBed } from '@angular/core/testing';
import { afterEach } from 'vitest';
import { App } from './app';
import { translations, LANGUAGE_STORAGE_KEY } from './i18n';
import { VIDEO_LIBRARY } from './video-library';

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = 'en';
});

for (const [language, help] of [
  ['uk', 'Допомога'],
  ['vi', 'Trợ giúp'],
] as const) {
  it(`saves and restores ${language}, with English Settings and translated video cards`, async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.chooseLanguage(language);
    expect(app.language()).toBe('en');
    app.saveLanguage();
    fixture.detectChanges();
    expect(app.t('Help')).toBe(help);
    expect(document.documentElement.lang).toBe(language);
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(language);
    expect(fixture.nativeElement.querySelector('#tab-settings').textContent.trim()).toBe(
      'Settings',
    );
    expect(fixture.nativeElement.querySelector('#settings-panel button').textContent.trim()).toBe(
      'Save',
    );
    app.selectTab('videos');
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('#video-library a');
    expect(links.length).toBe(16);
    expect(
      [...links].every((link: any) => link.target === '_blank' && link.href.startsWith('https://')),
    ).toBe(true);
    fixture.destroy();
    const restored = TestBed.createComponent(App);
    expect(restored.componentInstance.language()).toBe(language);
    expect(Object.keys(translations[language]).sort()).toEqual(Object.keys(translations.en).sort());
    expect(Object.values(translations[language]).every((text) => text.trim().length > 0)).toBe(
      true,
    );
    for (const video of VIDEO_LIBRARY) expect(translations[language][video.title]).toBeTruthy();
    expect(new Set(VIDEO_LIBRARY.map((video) => video.url)).size).toBe(16);
  });
}
