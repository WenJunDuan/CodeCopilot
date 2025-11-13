---
allowed-tools: Task, Read, Write, Bash
argument-hint: "研究主题"
description: R1研究阶段命令 - 需求分析、技术调研、经验回忆
---

# /research - R1研究阶段命令

## 命令说明

执行RIPER-6的R1（Research）阶段，进行需求分析、技术调研和经验回忆。

## 执行流程

```markdown
=== R1-RESEARCH 阶段 ===

**PM**: "开始R1研究阶段。"

**PDM**: 
[INTERNAL_ACTION: Analyzing via context7.]
创建: /project_document/research/requirements_analysis.md

**AR**:
[INTERNAL_ACTION: Technical analysis via sequential-thinking.]
创建: /project_document/research/tech_research.md

**DW**:
[INTERNAL_ACTION: Recalling via memory.]
创建: /project_document/research/memory_recall.md

**PM**: "研究阶段完成。"
```

## 输出
- requirements_analysis.md
- tech_research.md
- memory_recall.md

---

**建议**: 通常通过 `/develop` 自动调用，无需单独使用。
