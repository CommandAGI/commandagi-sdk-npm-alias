// `commandagi` is an ALIAS. The implementation is `@commandagi/sdk`, and there is exactly one of it.
//
// The name exists because it is the one people guess — the Python SDK is `commandagi` on PyPI, so a
// reader who has seen `pip install commandagi` reaches for `npm install commandagi` next. Holding it
// keeps that guess working AND keeps the name away from anyone who would publish something else under
// it.
//
// This file must never grow logic. See ../NAMESPACE.md.
export * from "@commandagi/sdk";
export { default } from "@commandagi/sdk";
