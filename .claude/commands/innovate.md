---
allowed-tools: Task, Read, Write, Bash
argument-hint: "设计主题"
description: I创新设计阶段命令 - 架构设计、技术方案制定
---

# /innovate - I创新设计阶段命令

## 命令说明

执行RIPER-6的I（Innovate）阶段，进行架构设计和技术方案制定。

## 执行流程

```markdown
=== I-INNOVATE 阶段 ===

**AR**:
[INTERNAL_ACTION: Deep thinking via sequential-thinking.]
创建: /project_document/proposals/architecture_design.md
- 架构设计
- 技术栈选择
- 接口设计
- 风险预案

**PDM**: 从产品角度评审方案

**PM**: 可选召开会议
[调用: /meeting "技术方案评审"]
```

## 输出
- architecture_design.md
- 技术方案决策记录

---

**建议**: 通常通过 `/develop` 自动调用，无需单独使用。
