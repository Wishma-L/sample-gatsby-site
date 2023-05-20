exports.onPreInit = () => console.log("__Loaded gatsby-starter-plugin__");

import type { GatsbyNode } from "gatsby";

const CUSTOM_TEAM_MEMBER_TYPE = `TeamMember`;

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const data = {
    teamData: [
      {
        id: 1,
        firstName: `Name 1`,
        lastName: "last 1",
        description: `Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.`,
      },
      {
        id: 2,
        firstName: `Name 2`,
        lastName: "last 2",
        description: `Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.`,
      },
      {
        id: 3,
        firstName: `Name 3`,
        lastName: "last 3",
        description: `Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.`,
      },
      {
        id: 4,
        firstName: `Name 4`,
        lastName: "last 4",
        description: `Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.`,
      },
    ],
  };

  // loop through data and create Gatsby nodes
  data.teamData.forEach((member) =>
    createNode({
      ...member,
      id: createNodeId(`${CUSTOM_TEAM_MEMBER_TYPE}-${member.id}`),
      parent: null,
      children: [],
      internal: {
        type: CUSTOM_TEAM_MEMBER_TYPE,
        content: JSON.stringify(member),
        contentDigest: createContentDigest(member),
      },
    })
  );
};
