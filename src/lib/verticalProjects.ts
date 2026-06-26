// Mapping vertical slug → Ideas Studio project_id
// Fill in each ID once your projects are created in Ideas Studio.
// Leave empty string if a vertical project doesn't exist yet.

export const VERTICAL_PROJECTS: Record<string, string> = {
  tech:          '',
  lifestyle:     '',
  finance:       '',
  entertainment: '',
  nature:        '',
  education:     '',
  health:        '',
  travel:        '',
  society:       '',
  science:       '',
  business:      '',
  sports:        '',
}

export function getProjectId(vertical: string): string {
  return VERTICAL_PROJECTS[vertical] ?? ''
}

export function isCMSEnabled(): boolean {
  return Object.values(VERTICAL_PROJECTS).some((id) => id !== '')
}
