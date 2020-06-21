import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {

  closeSidenavSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {

  }

  getUniqueID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  loadStyle(path: string, callback) {
    let isFound = false;

    if (!path) {
      callback(false);
    }

    let scripts = document.getElementsByTagName("link");
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('href') !== null && scripts[i].getAttribute('href').includes(path)) {
        isFound = true;
      }
    }
    if (isFound) {
      callback(false);
    } else {

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = path;
      link.media = 'all';

      document.getElementsByTagName('head')[0].appendChild(link);
      //  this.renderer.appendChild('body', script);
      link.onload = () => {
        callback(true);
      };
    }
  }

  loadStyles(paths: string[], callback) {

    if (!paths || !paths.length)
      callback();
    else {
      const path = paths.splice(0, 1)[0];
      this.loadStyle(path, () => {
        this.loadStyles(paths, callback);
      });
    }
  }

  _loadScriptCallbackHash = {};
  _loadScriptStatusHash = {};

  loadScript(path: string, callback) {
    let isFound = false;

    if (!path) {
      callback(false, path);
    }

    if (this._loadScriptStatusHash[path])
      isFound = this._loadScriptStatusHash[path].loaded;

    if (isFound) {
      callback(false, path);
    } else {

      this._loadScriptCallbackHash[path] = this._loadScriptCallbackHash[path] || { callbacks: [] };

      if (this._loadScriptStatusHash[path] && this._loadScriptStatusHash[path].loading) {
        this._loadScriptCallbackHash[path].callbacks.push(callback);
      } else {
        this._loadScriptStatusHash[path] = { loaded: false, loading: true };
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = path;
        document.getElementsByTagName('head')[0].appendChild(script);
        //  this.renderer.appendChild('body', script);

        script.onload = () => {
          this._loadScriptStatusHash[path] = { loaded: true, loading: false };
          this._loadScriptCallbackHash[path].callbacks.push(callback);
          this._loadScriptCallbackHash[path].callbacks.forEach(cb => cb(true, path));
        };
      }

    }
  }

  loadScripts(paths: string[], callback) {

    if (!paths || !paths.length)
      callback();
    else {
      const path = paths.splice(0, 1)[0];
      this.loadScript(path, () => {
        this.loadScripts(paths, callback);
      });
    }
  }

}
