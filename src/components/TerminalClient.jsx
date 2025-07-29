import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TerminalClient = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(null);
  const isRunning = useRef(false);
  const commandHistory = useRef([]);
  const historyIndex = useRef(-1);
  const navigate = useNavigate();
  const location = useLocation();

  const [terminating, setTerminating] = useState(false);
  const [terminated, setTerminated] = useState(false);

  const instanceId = location.state?.instanceId;

  useEffect(() => {
    if (!instanceId) {
      navigate('/');
      return;
    }

    term.current = new Terminal({
      cursorBlink: true,
      fontFamily: 'monospace',
      fontSize: 14,
      theme: {
        background: '#000000',
        foreground: '#00ff00',
      },
        allowProposedApi: true,        // 👈 required for copy-paste
  scrollback: 1000,
    });

    fitAddon.current = new FitAddon();
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();

    const handleResize = () => {
      fitAddon.current.fit();
      scrollToBottom();
    };
    window.addEventListener('resize', handleResize);

    const scrollToBottom = () => {
      term.current.scrollToBottom();
    };

    const prompt = () => {
      term.current.write('\r\n$ ');
      scrollToBottom();
    };

    term.current.writeln('Connected to EC2 via SSM.');
    prompt();


    let currentCommand = '';

    term.current.onData(data => {
      if (isRunning.current) return;

      if (data === '\r') {
        term.current.writeln('');
        if (currentCommand.trim()) {
          commandHistory.current.push(currentCommand);
          historyIndex.current = commandHistory.current.length;
        }
        handleCommand(currentCommand.trim());
        currentCommand = '';
      } else if (data === '\u007F') {
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          term.current.write('\b \b');
        }
      } else if (data === '\u001B[A') {
        if (historyIndex.current > 0) {
          historyIndex.current--;
          currentCommand = commandHistory.current[historyIndex.current];
          clearCurrentLine();
          term.current.write(currentCommand);
        }
      } else if (data === '\u001B[B') {
        if (historyIndex.current < commandHistory.current.length - 1) {
          historyIndex.current++;
          currentCommand = commandHistory.current[historyIndex.current];
        } else {
          historyIndex.current = commandHistory.current.length;
          currentCommand = '';
        }
        clearCurrentLine();
        term.current.write(currentCommand);
      } else {
        currentCommand += data;
        term.current.write(data);
      }
    });

    const clearCurrentLine = () => {
      term.current.write('\r$ ' + ' '.repeat(currentCommand.length) + '\r$ ');
    };

    const handleCommand = async (cmd) => {
      if (!cmd) {
        prompt();
        return;
      }

      isRunning.current = true;
      try {
        const { data } = await axios.post('http://13.204.81.232:3000/instances/connect', {
          instanceId,
          command: cmd,
        });

        const lines = data.output ? data.output.split('\n') : [`bash: ${cmd}: command not found`];
        for (const line of lines) {
          term.current.writeln(line);
          await new Promise(res => setTimeout(res, 30000));
        }
      } catch (err) {
        term.current.writeln(`Error: ${err.message}`);
      }
      isRunning.current = false;
      prompt();
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      term.current.dispose();
    };
  }, [instanceId, navigate]);


  // handle terminate
  const handleTerminate = async () => {
  setTerminating(true);
  try {
    await axios.post(`http://13.204.81.232:3000/instances/${instanceId}/terminate`);
    setTerminated(true);
    term.current.writeln('\r\n⚠️ Instance terminated successfully.');
    setTimeout(() => navigate('/'), 3000); // Redirect after 3s
  } catch (err) {
    term.current.writeln('\r\n❌ Failed to terminate instance.');
    alert("Error: " + err.message);
  } finally {
    setTerminating(false);
  }
};

  return (
    <>
      <div className="flex items-center justify-between bg-gray-900 text-white px-6 py-4">
        <div>
          <h5 className="text-lg font-semibold">
            Instance ID: <span className="text-green-400">{instanceId}</span>
          </h5>
        </div>
        <div>
          <button
            onClick={handleTerminate}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
            disabled={terminating || terminated}
          >
            {terminating
              ? "Terminating..."
              : terminated
              ? "Terminated ✅"
              : "Terminate Instance"}
          </button>
        </div>
      </div>

      <div className="w-screen h-[calc(100vh-64px)] bg-black overflow-hidden">
        <div ref={terminalRef} className="w-full h-full" />
      </div>
    </>
  );
};

export default TerminalClient;
