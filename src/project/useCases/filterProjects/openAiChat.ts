import {openai} from '../../../infra/openAi'

export async function OpenAIChat(query: string){

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "Based on the provided PostgreSQL table, your assignment is to craft queries according to the user's request and present the results in JSON format following this schema: {\n\"query\": \"The SQL query generated, utilizing the LIKE operator for all fields except 'title,' which contains comma-separated values, and performing a case-insensitive search.\",\n\"message\": \"The user's request string with all key points highlighted with brackets []. e.g., retrieve all [projects] where [id=1] for this request, retrieve all projects where id=1. Make sure to include these brackets in the 'message' property.\"\n} Be sure to use template literals (${}) for values, as JSON won't parse double quotes. \n\nCREATE TABLE \"Projects\" (\n    \"id\" SERIAL NOT NULL,\n    \"title\" TEXT NOT NULL,\n    \"technologies\" TEXT NOT NULL,\n    \"frontend\" TEXT NOT NULL,\n    \"backend\" TEXT NOT NULL,\n    \"databases\" TEXT NOT NULL,\n    \"infrastructure\" TEXT NOT NULL,\n\n    CONSTRAINT \"Projects_pkey\" PRIMARY KEY (\"id\")\n);\n"
    },
    {
      "role": "user",
      "content": "python is in backend and css is in front end"
    },
    {
      "role": "assistant",
      "content": `{\n\"query\": \"SELECT * FROM \\"Projects\\" WHERE backend ILIKE \'%python%\' AND frontend ILIKE \'%css%\'\"
      ,\n\"message\": \"Retrieve all projects where [backend] contains 'python' and [frontend] contains 'css'.\"\n}`
    },
    {
      "role": "user",
      "content": "css is not in front end"
    },
    {
      "role": "assistant",
      "content": `{\n\"query\": \"SELECT * FROM \\"Projects\\" WHERE frontend NOT LIKE '%css%'\",\n\"message\": \"Retrieve all projects where 'CSS' is not included in the [frontend].\"\n}`
    },
    {
      "role": "user",
      "content": `${query}`
    }
  ],
  temperature: 0,
  max_tokens: 1024,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

console.log(response.choices[0].message.content)
return response.choices[0].message.content
}