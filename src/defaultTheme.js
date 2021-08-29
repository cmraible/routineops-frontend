const routineopsTheme = {
  "name": "routineops",
  "rounding": 13,
  "spacing": 24,
  "defaultMode": "light",
  "global": {
    "edgeSize": {
      "small": "8px"
    },
    "colors": {
      "brand": {
        "dark": "#FFFFFF",
        "light": "#000000"
      },
      "background": {
        "dark": "#111111",
        "light": "#FFFFFF"
      },
      "background-back": {
        "dark": "#111111",
        "light": "#EEEEEE"
      },
      "background-front": {
        "dark": "#010101",
        "light": "#DDDDDD"
      },
      "background-contrast": {
        "dark": "#212121",
        "light": "#efefef"
      },
      "text": {
        "dark": "#EEEEEE",
        "light": "#444444"
      },
      "text-strong": {
        "dark": "#FFFFFF",
        "light": "#222222"
      },
      "text-weak": {
        "dark": "#CCCCCC",
        "light": "#555555"
      },
      "text-xweak": {
        "dark": "#EEEEEE",
        "light": "#AAAAAA"
      },
      "border": {
        "dark": "#333333",
        "light": "#DDDDDD"
      },
      "placeholder": "#AAAAAA",
      "selected": {
        "light": "#4065FF",
        "dark": "#3b93FF"
      },
      "focus": "selected",
      "control": "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-scheduled": "#FFF391",
      "status-warning": "#FFAA15",
      "status-ok": "#23AA19",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning"
    },
    "font": {
      "family": "Helvetica",
    },
    "active": {
      "background": "active-background",
      "color": "active-text"
    },
    "hover": {
      "background": "active-background",
      "color": "active-text"
    },
    "selected": {
      "background": "selected-background",
      "color": "selected-text"
    },
    "control": {
      "border": {
        "radius": "13px"
      }
    },

  },
  "chart": {},
  "diagram": {
    "line": {}
  },
  "meter": {},
  "button": {
    "size": {
      "small": {
        "border": {
          "radius": "13px"
        }
      },
      "medium": {
        "border": {
          "radius": "13px"
        }
      },
      "large": {
        "border": {
          "radius": "13px"
        },
        "pad": {
          "vertical": "9px"
        },
        "font": {
          "weight": "900"
        }
      },
    },
  },
  "checkBox": {
    "color": "selected"
  },
  "heading": {
    "font": {
      "family": "Helvetica"
    }
  },
  "tabs": {
    "extend": `
      overflow-x: scroll;
      overflow-y: hidden;
      whiteSpace: nowrap;
    `,
    "gap": "large",
    "pad": "none"
  },
  "tab": {
    "pad": {
      "horizontal": "medium",
      "vertical": "small"
    },
    "margin": "none",
    "active": {
      "color": "selected",
      "border": {
        "size": "large"
      }
    },
    "border": {
      "color": "white",
      "size": "medium",
      "active": {
        "color": "selected",
        "size": "large"
      }
    }
  },
  "text": {
    "xsmall": {
      "size": "10px"
    },
    "medium": {
      "size": "14px"
    },
    "large": {
      "size": "18px"
    },
    "xlarge": {
      "size": "24px"
    },
    "xxlarge": {
      "size": "36px"
    }
  },
  "formField": {
    "extend": {
      "font-weight": 900
    },
    "border": {
      "color": "border",
      "style": "dotted",
      "error": {
        "color": "status-critical"
      },
      "position": "inner",
      "side": "bottom",
      "size": "xsmall"
    },
    "content": {
      "pad": "small"
    },
    "disabled": {
      "background": {
        "color": "status-disabled",
        "opacity": "medium"
      }
    },
    "error": {
      "color": "status-critical",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "help": {
      "color": "dark-3",
      "margin": {
        "start": "small"
      }
    },
    "info": {
      "color": "text-xweak",
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      }
    },
    "label": {
      "margin": {
        "vertical": "xsmall",
        "horizontal": "small"
      },
      "color": "text",
      "size": "small"
    },
    "margin": {
      "bottom": "small"
    }
  }
}

export default routineopsTheme;