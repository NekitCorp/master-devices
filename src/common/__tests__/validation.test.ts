import { describe, expect, it } from "vitest";
import { ipv4RegExp, serialNumberRegExp } from "../validation";

describe("validation", () => {
    describe("ipv4RegExp", () => {
        it("valid", async () => {
            expect(ipv4RegExp.test("192.168.0.1")).toBeTruthy();
            expect(ipv4RegExp.test("10.0.0.1")).toBeTruthy();
            expect(ipv4RegExp.test("172.16.0.1")).toBeTruthy();
        });

        it("invalid", async () => {
            expect(ipv4RegExp.test("256.256.256.256")).toBeFalsy();
            expect(ipv4RegExp.test("300.0.0.1")).toBeFalsy();
            expect(ipv4RegExp.test("1.2.3")).toBeFalsy();
        });
    });

    describe("serialNumberRegExp", () => {
        it("valid", async () => {
            expect(serialNumberRegExp.test("01234567-89ABCDEF-01234567-19ABCDEF")).toBeTruthy();
        });

        it("invalid", async () => {
            expect(serialNumberRegExp.test("123")).toBeFalsy();
            expect(serialNumberRegExp.test("01234567-89ABCDEf-01234567-19ABCDEF")).toBeFalsy();
            expect(serialNumberRegExp.test("01234567-89ABCDEF01234567-19ABCDEF")).toBeFalsy();
            expect(serialNumberRegExp.test("0123*567-89ABCDEf-01234567-19ABCDEF")).toBeFalsy();
        });
    });
});
