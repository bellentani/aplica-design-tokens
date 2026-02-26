module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New features
        'fix',      // Bug fixes
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, missing semicolons, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'chore',    // Maintenance tasks, dependencies, etc.
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Revert previous commits
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    // scope optional; when provided, must be one of the values below (warning)
    'scope-enum': [
      1,
      'always',
      [
        'docs', 'colors', 'typography', 'spacing', 'tokens', 'theme', 'data', 'ci', 'build', 'chore'
      ]
    ],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 15],
    'subject-max-length': [2, 'always', 72],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 90],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  }
}; 