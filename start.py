import subprocess
import environ

subprocess.run(['docker-compose', 'up', '-d' ])

environ.Env.read_env(env_file='.env')