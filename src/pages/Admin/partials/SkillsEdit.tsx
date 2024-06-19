import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Fab, Paper, TextField } from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import { deleteSkill, updateSkill } from "../../../firebase/DataChanges";
import { Skill } from "../../../firebase/DataTypes";

type SkillProps = {
  data?: Skill[];
  category: string;
};

type OrderedSkill = Skill & { order: number };

export const SkillsEdit: FC<SkillProps> = ({ category, data }) => {
  const [skills, setSkills] = useState<OrderedSkill[]>([]);

  useEffect(() => {
    const updatedSkills = data
      ?.filter((skill) => skill.category === category)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map<OrderedSkill>((skill, index) => ({ ...skill, order: index }));

    setSkills(updatedSkills || []);
  }, [data, category]);

  const updateSingleSkill = (skill: OrderedSkill) => {
    const filteredSkills = skills.filter((s) => s.id !== skill.id);
    const updatedSkills = [...filteredSkills, skill].sort(
      (a, b) => a.order - b.order
    );
    setSkills(updatedSkills);
  };

  const handleNameChange = (skill: OrderedSkill, name: string) => {
    updateSingleSkill({ ...skill, name });
  };

  const handleRatingChange = (skill: OrderedSkill, rating: number) => {
    updateSingleSkill({ ...skill, rating });
  };

  const handleLogoUrlChange = (skill: OrderedSkill, logoUrl: string) => {
    updateSingleSkill({ ...skill, logoUrl });
  };

  return (
    <Grid container direction="column" width={"80vw"}>
      {skills?.map((skill) => (
        <Grid key={skill.id} sm={12}  marginLeft={'auto'} marginRight={'auto'}>
          <Paper elevation={3} style={{ padding: '16px',marginBottom:'16px'}} >
              <Grid container width={'100%'}  >
                  <Grid container width={'80%'} columnGap={'2%'}>
                      <Grid width={'70%'}>
                          <TextField
                              label="Name of skill"
                              variant="outlined"
                              value={skill.name}
                              fullWidth
                              onChange={(e) => 
                                  handleNameChange(skill, e.target.value)}
                          />
                      </Grid>
                      <Grid width={'28%'}>
                          <TextField
                              label="Rating"
                              variant="outlined"
                              value={skill.rating}
                              fullWidth
                              type="number"
                              onChange={(e) => 
                                  handleRatingChange(skill, Number(e.target.value))}
                          />
                      </Grid>
                      <Grid width={'100%'} marginTop={'2%'}>
                          <TextField
                              label="url of logo"
                              variant="outlined"
                              value={skill.logoUrl}
                              fullWidth
                              onChange={(e) => 
                                  handleLogoUrlChange(skill, e.target.value)}
                          />
                      </Grid>
                  </Grid>
                  <Grid width={'15%'} margin={'auto'}>
                      <Fab color="success" 
                          onClick={() => updateSkill(skill)}
                          sx={{margin: '5px'}}>
                          <Save />
                      </Fab>
                      <Fab color="error"
                          onClick={() => deleteSkill(skill)}
                          sx={{margin: '5px'}}>
                          <Delete />
                      </Fab>
                  </Grid>
              </Grid>
          </Paper>
      </Grid>
      ))}
    </Grid>
  );
};
