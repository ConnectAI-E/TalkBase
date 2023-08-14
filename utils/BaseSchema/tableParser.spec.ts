import { TableParser } from "./tableParser";
import { describe, expect, it } from "vitest";
import { TableProps } from "./table";

const tableInfo: TableProps = {
  name: "SentimentResponse",
  fields: [
    {
      id: "fld8t4vEEN",
      type: 1,
      name: "content",
      property: {},
    },
    // 单选
    {
      id: "fld1g8LMRX",
      type: 3,
      name: "sentiment",
      property: {
        options: [
          {
            id: "optdhSv28L",
            name: "negative",
            color: 0,
          },
          {
            id: "opt7HpQCOH",
            color: 1,
            name: "neutral",
          },
          {
            id: "opt3UsIu8H",
            color: 2,
            name: "positive",
          },
        ],
      },
    },
    //多选
    {
      id: "fldfZnyFTg",
      type: 4,
      name: "fruit",
      property: {
        options: [
          {
            id: "optdh2v28L",
            name: "橘子",
            color: 0,
          },
          {
            id: "opt3HpQCOH",
            color: 1,
            name: "苹果",
          },
          {
            id: "opt1UsIu8H",
            color: 2,
            name: "菠萝",
          },
        ],
      },
    },
    // 数字
    {
      id: "fldueXn0k2",
      name: "Height",
      property: {},
      type: 2,
    },
    // 单选框
    {
      id: '"fldueXn0k2"',
      name: "is_novel",
      property: {},
      type: 7,
    },
    //评分
    { id: "fldueXn0k2", name: "score", property: {}, type: 99004 },
    // 电话
    { id: "fldueXn0k2", name: "phone", property: {}, type: 13 },
  ],
};

describe("BaseSchema class init", () => {
  const core = new TableParser(tableInfo);
  it("get table title", () => {
    expect(core.title).toBe("SentimentResponse");
  });
  it("should get fields names", function () {
    expect(core.fieldNames).toEqual(["content", "sentiment"]);
  });
});

describe("BaseSchema class format", () => {
  const core = new TableParser(tableInfo);

  it("should format string field", function () {
    expect(core.formatStringField(tableInfo.fields[0])).toBe(
      "content: string;",
    );
  });

  it("should format select field", function () {
    expect(core.formatSelectField(tableInfo.fields[1])).toBe(
      `sentiment: "negative" | "neutral" | "positive";`,
    );
  });

  it("should format multi select field", function () {
    expect(core.formatMultiSelectField(tableInfo.fields[2])).toBe(
      `fruit: ("橘子" | "苹果" | "菠萝")[];`,
    );
  });

  it("should format number field", function () {
    expect(core.formatNumberField(tableInfo.fields[3])).toBe(`Height: number;`);
  });

  it("should format boolean field", function () {
    expect(core.formatBooleanField(tableInfo.fields[4])).toBe(
      `is_novel: boolean;`,
    );
  });

  it("should format grade fields", function () {
    expect(core.formatNumberField(tableInfo.fields[5])).toBe(`score: number;`);
  });

  it("should format phone fields", function () {
    expect(core.formatPhoneField(tableInfo.fields[6])).toBe(`phone: string;`);
  });

  it("should format title", function () {
    expect(core.formatTitle()).toBe("export interface SentimentResponse {");
  });

  it("should format end", function () {
    expect(core.formatEnd()).toBe("}");
  });

  it("should format all", function () {
    expect(core.typeStr).toBe(`export interface SentimentResponse {
content: string;
sentiment: "negative" | "neutral" | "positive";
}`);
  });
});
