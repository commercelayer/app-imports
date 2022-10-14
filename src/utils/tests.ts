export function testInvariant(
  testFn: () => void,
  expectedInvariant: string
): void {
  try {
    testFn()
  } catch (e) {
    expect((e as any).toString()).toBe(
      `Invariant Violation: ${expectedInvariant}`
    )
  }
}
