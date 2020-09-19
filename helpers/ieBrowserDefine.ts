export default () => {
  let name: string = '';
  let versionMatch: any = null;
  let version: any = null;

  if (process.client) {
    const ua: any = window.navigator.userAgent;
    const versionSplit: RegExp = /[\/\.]/i;
    const versionRe: RegExp = /(Version)\/([\w.\/]+)/i; // match for browser version
    const operaRe: RegExp = /(Opera|OPR)[\/ ]([\w.\/]+)/i;
    const ieRe: RegExp = /(?:(MSIE) |(Trident)\/.+rv:)([\w.]+)/i; // must not contain 'Opera'
    let match: any = ua.match(operaRe) || ua.match(ieRe);

    if (match) {
      match = match.filter((item: string) => {
        return (item != null);
      });

      name = match[1].replace('Trident', 'MSIE').replace('OPR', 'Opera');
      versionMatch = ua.match(versionRe) || match;
      version = versionMatch[2].split(versionSplit);
    }
  }

  return { name, version };
};
