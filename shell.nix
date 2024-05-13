with import <nixpkgs> { };
let
  name = "Party Wizard";
  pythonEnv = python311.withPackages (ps: [
    # ps.django_4
    # ps.djangorestframework
    # ps.django-cors-headers
    # ps.djangorestframework-simplejwt
    # ps.pyjwt
    # ps.django-filter

    ps.flake8
    ps.bpython
    ps.autopep8
    # ps.black
  ]);

in
mkShell {
  buildInputs = [
    # pythonEnv
    python311
    # httpie
    # bmake
    # http-prompt
  ];

  shellHook = ''
    echo "Enter to '${name}' env..."
    source env/bin/activate
    echo "Upgrade pip and install packages..."
    pip install --upgrade pip
    pip install -r PARTY/backend/requirements.txt
    which python
    echo "Env activated"
    exec fish
  '';
}
