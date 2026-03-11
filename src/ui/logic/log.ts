import { dateToHHMMSS } from '../../utils/helpers';

export function logLink(href: string, downloadName: string, label: string): void {
  const logDiv = document.createElement('div');
  const a = document.createElement('a');
  a.href = href;
  a.download = downloadName;
  a.textContent = label;
  logDiv.appendChild(a);

  try {
    const logContainer = document.querySelector('#logArea');
    if (logContainer) {
      logContainer.appendChild(logDiv);
      const autoScrollCheckbox = document.querySelector<HTMLInputElement>('#autoScroll');
      if (autoScrollCheckbox?.checked) logDiv.scrollIntoView();
    }
  } catch (error) {
    console.error('[GPTK]', String(error));
  }
}

export default function log(logMessage: string, type: string | null = null): void {
  const logPrefix = '[GPTK]';

  const now = new Date();
  const timestamp = dateToHHMMSS(now);

  // Create a new div for the log message
  const logDiv = document.createElement('div');
  logDiv.textContent = `[${timestamp}] ${logMessage}`;

  if (type) logDiv.classList.add(type);

  console.log(`${logPrefix} [${timestamp}] ${logMessage}`);

  // Append the log message to the log container
  try {
    const logContainer = document.querySelector('#logArea');
    if (logContainer) {
      logContainer.appendChild(logDiv);
      const autoScrollCheckbox = document.querySelector<HTMLInputElement>('#autoScroll');
      if (autoScrollCheckbox?.checked) logDiv.scrollIntoView();
    }
  } catch (error) {
    console.error(`${logPrefix} [${timestamp}] ${String(error)}`);
  }
}
