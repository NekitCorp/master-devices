import { beforeEach, describe, expect, it, vi } from "vitest";
import { ValidationError } from "../../../lib/errors";
import { deviceStore } from "../device-store";

const countDocumentsMock = vi.fn();
const updateOneMock = vi.fn(async () => null);

vi.mock("../../../lib/mongodb", () => {
    return {
        databasePromise: Promise.resolve({
            collection: (name: string) => ({
                countDocuments: countDocumentsMock,
                updateOne: updateOneMock,
            }),
        }),
    };
});

describe("device-store", () => {
    describe("link", () => {
        beforeEach(() => {
            countDocumentsMock.mockReset();
            updateOneMock.mockReset();
        });

        it("success link device", async () => {
            countDocumentsMock.mockImplementation(async () => 5);

            await deviceStore.link("6427ef8bb2457b7726ecb75a", "6427ef8bb2457b7726ecb757");

            expect(countDocumentsMock).toBeCalledTimes(1);
            expect(updateOneMock).toBeCalledTimes(1);
        });

        it("no more that 10 peripheral devices are allowed for a gateway", async () => {
            countDocumentsMock.mockImplementation(async () => 10);

            await expect(() => deviceStore.link("6427ef8bb2457b7726ecb75a", "6427ef8bb2457b7726ecb757")).rejects.toThrow(
                new ValidationError("No more that 10 peripheral devices are allowed for a gateway.")
            );

            expect(countDocumentsMock).toBeCalledTimes(1);
            expect(updateOneMock).toBeCalledTimes(0);
        });
    });
});
