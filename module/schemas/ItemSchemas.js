// import DataModel from "common/abstract/data.mjs";
import { ARM5E } from "../config.js";
import {
  authorship,
  characteristicField,
  itemBase,
  SeasonField,
  XpField
} from "./commonSchemas.js";
const fields = foundry.data.fields;
export class AbilitySchema extends foundry.abstract.DataModel {
  static defineSchema() {
    const base = itemBase();
    return {
      ...itemBase(),
      defaultChaAb: new fields.StringField({ required: false, blank: false, initial: "int" }),
      speciality: new fields.StringField({ required: false, blank: true, initial: "" }),
      xp: XpField(),
      key: new fields.StringField({ required: false, blank: true, initial: "" }),
      option: new fields.StringField({ required: false, blank: true, initial: "" })
    };
  }
}

export class BookSchema extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      ...itemBase(),
      ...authorship(),

      quality: new fields.NumberField({
        required: false,
        nullable: false,
        integer: true,
        min: 0,
        initial: 0,
        step: 1
      }),
      level: new fields.NumberField({
        required: false,
        nullable: true,
        integer: true,
        min: 0,
        initial: 0,
        step: 1
      }),
      type: new fields.StringField({
        required: false,
        blank: false,
        initial: "Summa",
        choices: ARM5E.books.types
      }),
      topic: new fields.SchemaField({
        category: new fields.StringField({
          required: true,
          nullable: false,
          initial: "art",
          choices: ["art", "ability", "spell"]
        }),
        art: new fields.StringField({ required: false, nullable: true, initial: "cr" }),
        key: new fields.StringField({ required: false, nullable: true, initial: null }),
        option: new fields.StringField({ required: false, nullable: true, initial: null }),
        spellName: new fields.StringField({ required: false, nullable: true, initial: null })
      })
    };
  }

  // @override
  _validate(data) {
    // first call the standard validate model
    super._validate(data);
    let error = false;
    if (data.system.topic.art !== null) {
      topicCount++;
    }
    if (data.system.topic.spellName !== null) {
      topicCount++;
    }
    if (data.system.topic.key !== null) {
      topicCount++;
    }
    if (topicCount != 1) {
      throw new Error("A book cannot cover more than one topic");
    }
  }
}

export class VirtueFlawSchema extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      ...itemBase(),
      type: new fields.StringField({
        required: false,
        blank: false,
        initial: "general",
        choices: Object.keys(ARM5E.virtueFlawTypes.character)
          .concat(ARM5E.virtueFlawTypes.laboratory)
          .concat(ARM5E.virtueFlawTypes.covenant)
          .concat("other")
      }),
      impact: new fields.StringField({
        required: false,
        blank: false,
        initial: "free",
        choices: Object.keys(ARM5E.impacts)
      })
    };
  }
}

export class DiaryEntrySchema extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      ...itemBase(),
      season: SeasonField(),
      year: new fields.NumberField({
        required: false,
        nullable: false,
        integer: true,
        initial: 1200,
        step: 1
      }),
      duration: new fields.NumberField({
        required: false,
        nullable: false,
        integer: true,
        positive: true,
        initial: 1
      }),
      endSeason: new fields.StringField({
        required: false,
        nullable: true,
        initial: null,
        choices: Object.keys(ARM5E.seasons)
      }),
      endYear: new fields.NumberField({
        required: false,
        nullable: true,
        integer: true,
        initial: null,
        step: 1
      }),
      sourceQuality: new fields.NumberField({
        required: false,
        nullable: false,
        integer: true,
        min: 0,
        initial: 0,
        step: 1
      }),
      activity: new fields.StringField({
        required: false,
        blank: false,
        initial: "none",
        choices: Object.keys(ARM5E.activities.generic)
      }),
      teacher: new fields.SchemaField({
        id: new fields.ForeignDocumentField({
          nullable: true,
          initial: null
        }),
        name: new fields.StringField({ required: true, blank: false }),
        com: characteristicField(),
        teaching: new fields.NumberField({
          required: false,
          nullable: false,
          integer: true,
          positive: true,
          initial: 1,
          step: 1
        }),
        applySpec: new fields.BooleanField({ required: false, initial: false }),
        score: new fields.NumberField({
          required: false,
          nullable: false,
          integer: true,
          min: 0,
          initial: 2,
          step: 1
        })
      }),
      progress: new fields.SchemaField({
        abilities: new fields.ArrayField(
          new SchemaField({
            id: new fields.DocumentIdField(),
            category: new fields.StringField({ required: true, blank: false }),
            xp: XpField()
          })
        ),
        arts: new fields.ArrayField(
          new SchemaField({
            key: new fields.StringField({ required: true, blank: false }),
            xp: XpField()
          })
        ),
        spells: new fields.ArrayField(
          new SchemaField({
            id: new fields.DocumentIdField(),
            form: new fields.StringField({ required: true, blank: false }),
            xp: XpField()
          })
        )
      })
    };
  }
}

export class ItemSchema extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      ...itemBase(),
      quantity: new fields.NumberField({
        required: false,
        nullable: false,
        integer: true,
        min: 0, // allow quantity of 0 to keep an eye on what is missing
        initial: 1,
        step: 1
      }),
      weight: new fields.NumberField({
        required: false,
        nullable: false,
        min: 0,
        initial: 0
      })
    };
  }
}

export class VisSchema extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      ...itemBase(),
      art: new fields.StringField({
        required: false,
        blank: false,
        initial: "cr",
        choices: Object.keys(ARM5E.magic.arts)
      }),
      pawns: new fields.NumberField({
        required: false,
        nullable: false,
        integer: true,
        min: 0, // allow quantity of 0 to keep an eye on what is missing
        initial: 1,
        step: 1
      })
    };
  }
}

export class MySchema extends foundry.abstract.DataModel {
  static defineSchema() {
    return { ...itemBase() };
  }
}
